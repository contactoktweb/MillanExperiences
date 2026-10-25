import type { SeedPost } from "../types"
import { rosarioIslands } from "./rosario-islands"
import { bestTimeCartagena } from "./best-time-cartagena"
import { yachtCharter } from "./yacht-charter"
import { bachelorParty } from "./bachelor-party"
import { destinationWedding } from "./destination-wedding"
import { villaRentalFaq } from "./villa-rental-faq"
import { hotelVsVilla } from "./hotel-vs-villa"
import { whereToStay } from "./where-to-stay"
import { bestRestaurants } from "./best-restaurants"
import { nightlife } from "./nightlife"

// The first seed post is marked as featured when imported.
export const seedPosts: SeedPost[] = [
  rosarioIslands,
  bestTimeCartagena,
  yachtCharter,
  destinationWedding,
  bachelorParty,
  villaRentalFaq,
  hotelVsVilla,
  whereToStay,
  bestRestaurants,
  nightlife,
]
