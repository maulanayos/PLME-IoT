package main

import (
	"context"
	"embed"
	"log"
	"plme/ops/handler"
	"time"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/forms"
	"github.com/pocketbase/pocketbase/tools/filesystem"
)

//go:embed all:dist/*
var dist embed.FS

func main() {
	app := pocketbase.New()

	app.OnRecordAfterAuthWithOAuth2Request().Add(func(e *core.RecordAuthWithOAuth2Event) error {
		if e.IsNewRecord {
			e.Record.Set("role", "guest")
			e.Record.Set("name", e.OAuth2User.Name)
			e.Record.Set("emailVisibility", true)

			form := forms.NewRecordUpsert(app, e.Record)
			ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
			defer cancel()
			file, err := filesystem.NewFileFromUrl(ctx, e.OAuth2User.AvatarUrl)
			if err != nil {
				app.Logger().Error("failed to fetch file from url", "error", err)
			}
			form.AddFiles("avatar", file)
			if err := form.Submit(); err != nil {
				app.Logger().Error("form submit failed", "error", err.Error())
			}
		}
		return nil
	})

	app.OnBeforeServe().PreAdd(func(e *core.ServeEvent) error {
		var dist = echo.MustSubFS(dist, "dist")
		e.Router.GET("/*", handler.StaticDirectoryHandlerFallbackNotFound(dist, true))
		return nil
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}