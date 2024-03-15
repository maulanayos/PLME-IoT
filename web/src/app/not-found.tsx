"use client";

import {
  Button,
  Center,
  Container,
  Heading,
  Icon,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";
import Logo from "../Ui/Logo";

export default function NotFound() {
  return (
    <Container
      as="section"
      minW="100dvw"
      minH="100dvh"
      sx={{
        backgroundColor: "#edfaff",
        opacity: 1,
        backgroundImage:
          "linear-gradient(#c1d2e8 1.1px, transparent 1.1px), linear-gradient(to right, #c1d2e8 1.1px, #edfaff 1.1px)",
        backgroundSize: "22px 22px",
      }}
    >
      <Center h="80vh">
        <VStack textAlign="center" spacing={4}>
          <Image
            alt="404"
            borderRadius="md"
            maxH="200px"
            my={2}
            src="https://assets-v2.lottiefiles.com/a/3455ed68-1151-11ee-9772-5b4c76d6674b/xn6epX0wkV.gif"
            mixBlendMode="multiply"
          />
          <Heading
            lineHeight="shorter"
            fontSize={{ base: "2xl", md: "3xl" }}
            color="primary.light.500"
            _hover={{
              color: "secondary.light.500",
            }}
            transition="0.6s"
            userSelect="none"
          >
            Oops! Somethings missing.
          </Heading>

          <Text userSelect="none">
            Halaman yang Anda cari tidak ditemukan di sini.
          </Text>

          <Button
            size="sm"
            as="a"
            href="/"
            colorScheme="primary"
            rightIcon={<Icon as={FaArrowRight} />}
          >
            Kembali ke Halaman Utama
          </Button>
          <VStack position="fixed" bottom="8">
            <Text
              userSelect="none"
              color="blackAlpha.600"
              fontSize={["xs", "sm"]}
            >
              Copyright © 2023
            </Text>
            <Logo size="md" />
          </VStack>
        </VStack>
      </Center>
    </Container>
  );
}


// export const localFoods = sqliteTable("local_foods", {
//   id: integer("id").primaryKey(),
//   localityName: text("localityName").notNull(),
//   nationalityName: text("nationalityName").notNull(),
//   speciesName: text("speciesName"),
//   latinName: text("latin_name"),
//   biologicalCategory: text("biological_category").notNull(), ---------OPTIONS RELATION
//   consumedFunction: text("consumed_function").notNull(), ---------OPTIONS RELATION
//   macroNutrient: text("macro_nutrient"), ---------OPTIONS RELATION
//   microNutrient: text("micro_nutrient"), ---------OPTIONS RELATION
//   cultivationPlaces: text("cultivation_places"), ---------OPTIONS RELATION
//   subdistrict: text("subdistrict"),
//   subdistrictId: text("subdistrict_id"),
//   longitude: text("longitude"),
//   latitude: text("latitude"),
//   stillConsumed: text("still_consumed", { enum: ["yes", "no", "less"] }),
//   existanceStatus: text("existence_status", {
//     enum: ["yes", "no", "less"],
//   }),
//   image: text("image"), // MULTIPLE IMAGE
//   rawFoodImage: text("raw_food_image"), // MULTIPLE IMAGE
//   processedFoodImage: text("processed_food_image"),
//   contributor: text("contributor"),
//   contributorHtml: text("contributor_html"),
//   surveyDate: integer("survey_date", { mode: "timestamp" }),
//   processingMethod: text("processing_method"),
//   processingMethodHtml: text("processing_method_html"),
//   storageMethod: text("storage_method"),
//   storageMethodHtml: text("storage_method_html"),
//   serving: text("serving"),
//   servingHtml: text("serving_html"),
//   utilization: text("utilization"),
//   utilizationHtml: text("utilization_html"),
//   localKnowledge: text("local_knowledge"),
//   localKnowledgeHtml: text("local_knowledge_html"),
//   createdAt: integer("created_at", { mode: "timestamp" }).default(
//     sql`(strftime('%s', 'now'))`,
//   ),
//   createdBy: text("created_by").default(sql`'admin'`),
//   updatedAt: integer("updated_at", { mode: "timestamp" }).default(
//     sql`(strftime('%s', 'now'))`,
//   ),
//   updatedBy: text("updated_by").default(sql`'admin'`),
// });

// export const biologicalTypeOptions = [
//   { label: "Mamalia", value: "mamalia" },
//   { label: "Reptilia", value: "reptilia" },
//   { label: "Ruminansia", value: "ruminansia" },
//   { label: "Serangga", value: "serangga" },
//   { label: "Jamur", value: "jamur" },
//   { label: "Unggas dan binatang terbang", value: "unggas" },
//   { label: "Hewan berkaki empat (Non Reptil)", value: "hewan-berkaki-empat" },
//   { label: "Ikan dan HASI (Hewan air selain ikan)", value: "ikan-dan-hasi" },
//   { label: "Tumbuhan Air", value: "tumbuhan-air" },
//   { label: "Tumbuhan Darat", value: "tumbuhan-darat" },
//   { label: "Mikroorganisme", value: "mikroorganisme" },
//   { label: "Lainnya", value: "lainnya" },
// ];

// export const foodConsumptionFunctionOptions = [
//   { label: "Pangan pokok biji-bijian", value: "pangan-pokok-biji-bijian" },
//   { label: "Pangan pokok sagu-saguan", value: "pangan-pokok-sagu-saguan" },
//   { label: "Pangan pokok umbi-umbian", value: "pangan-pokok-umbi-umbian" },
//   { label: "Pangan pokok buah-buahan", value: "pangan-pokok-buah-buahan" },
//   { label: "Lauk nabati", value: "lauk-nabati" },
//   { label: "Lauk hewani", value: "lauk-hewani" },
//   { label: "Snack/cemilan", value: "cemilan" },
//   { label: "Jamu", value: "jamu" },
//   { label: "Alcoholic", value: "alcoholic" },
//   { label: "Jus", value: "jus" },
//   { label: "Ekstra Nabati", value: "ekstra Nabati" },
//   { label: "Fermentasi", value: "fermentasi" },
//   { label: "Obat", value: "obat" },
//   { label: "Telur", value: "telur" },
//   { label: "Susu dan olahannya", value: "susu" },
// ];

// export const macroNutrientOptions = [
//   { label: "Karbohidrat", value: "karbohidrat" },
//   { label: "Protein", value: "protein" },
//   { label: "Lemak", value: "lemak" },
//   { label: "Serat", value: "serat" },
// ];

// export const microNutrientOptions = [
//   { label: "Vitamin", value: "vitamin" },
//   { label: "Mineral Makro", value: "mineral-mako" },
//   { label: "Mineral Mikro", value: "mineral-mikro" },
//   { label: "Amino Acid", value: "amino-acid" },
//   { label: "Fatty Acid", value: "fatty-acid" },
// ];
// //sawah, hutan, laut, sungai, danau, rawa, ladang, perkarangan/kebun
// export const cultivationPlacesOptions = [
//   { label: "Sawah", value: "sawah" },
//   { label: "Hutan", value: "hutan" },
//   { label: "Laut", value: "laut" },
//   { label: "Sungai", value: "sungai" },
//   { label: "Danau", value: "danau" },
//   { label: "Rawa", value: "rawa" },
//   { label: "Ladang", value: "ladang" },
//   { label: "Perkarangan/Kebun", value: "kebun" },
// ];