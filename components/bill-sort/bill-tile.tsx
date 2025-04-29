"use client"

import { motion } from "framer-motion"
import type { Bill } from "@/components/bill-sort/bill-sort-game"

interface BillTileProps {
  bill: Bill
  isSelected: boolean
  onSelect: () => void
}

export function BillTile({ bill, isSelected, onSelect }: BillTileProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 17 }}
      onClick={onSelect}
      className={`
        h-20 flex items-center justify-center p-3 rounded-lg cursor-pointer
        border-2 transition-colors text-center
        ${
          isSelected
            ? "border-primary bg-primary/10 text-primary font-medium"
            : "border-muted-foreground/20 hover:border-muted-foreground/40 bg-card"
        }
      `}
    >
      <span className="text-xs sm:text-sm">{bill.title}</span>
    </motion.div>
  )
}
