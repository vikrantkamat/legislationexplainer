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
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onSelect}
      className={`
        p-3 rounded-md cursor-pointer transition-colors duration-200 flex items-center justify-center text-center
        ${
          isSelected
            ? "bg-primary text-primary-foreground font-medium shadow-md"
            : "bg-card hover:bg-accent border border-border"
        }
      `}
      style={{
        boxShadow: isSelected ? "0 4px 12px rgba(0, 0, 0, 0.1)" : "none",
      }}
    >
      <motion.span
        animate={{ scale: isSelected ? 1.05 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {bill.title}
      </motion.span>
    </motion.div>
  )
}
