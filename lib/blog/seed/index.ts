import type { SeedPost } from "../types"
import { rosarioIslands } from "./rosario-islands"
import { bestTimeCartagena } from "./best-time-cartagena"
import { yachtCharter } from "./yacht-charter"
import { bachelorParty } from "./bachelor-party"
import { destinationWedding } from "./destination-wedding"

// The first seed post is marked as featured when imported.
export const seedPosts: SeedPost[] = [
  rosarioIslands,
  bestTimeCartagena,
  yachtCharter,
  destinationWedding,
  bachelorParty,
]
