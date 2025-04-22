"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Filter, ChevronDown } from "lucide-react"

export function BillFilters() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Filter Bills By</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">Congress</DropdownMenuLabel>
          <DropdownMenuItem>118th Congress (2023-2024)</DropdownMenuItem>
          <DropdownMenuItem>117th Congress (2021-2022)</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">Chamber</DropdownMenuLabel>
          <DropdownMenuItem>House Bills</DropdownMenuItem>
          <DropdownMenuItem>Senate Bills</DropdownMenuItem>
          <DropdownMenuItem>House Resolutions</DropdownMenuItem>
          <DropdownMenuItem>Senate Resolutions</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">Policy Area</DropdownMenuLabel>
          <DropdownMenuItem>Health</DropdownMenuItem>
          <DropdownMenuItem>Government Operations</DropdownMenuItem>
          <DropdownMenuItem>Economics and Finance</DropdownMenuItem>
          <DropdownMenuItem>Education</DropdownMenuItem>
          <DropdownMenuItem>Environment</DropdownMenuItem>
          <DropdownMenuItem>View All Policy Areas...</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
