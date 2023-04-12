import { Order, GameAccount } from "@prisma/client";

export interface OrderWithGameAccount extends Order {
  GameAccount: GameAccount | null
}
