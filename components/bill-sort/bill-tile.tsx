"use client"

import { motion } from "framer-motion"
import type { Bill } from "./bill-sort-game"

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
      onClick={onSelect}
      className={`
        p-3 rounded-md cursor-pointer flex items-center justify-center text-center
        transition-colors duration-200 h-20 sm:h-24
        ${isSelected ? "bg-primary/20 border-2 border-primary" : "bg-card hover:bg-primary/10 border border-border"}
      `}
    >
      <span className="font-medium text-sm sm:text-base">{bill.title}</span>
    </motion.div>
  )
}
