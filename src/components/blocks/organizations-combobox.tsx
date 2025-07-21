"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { ChevronsUpDownIcon, CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverTrigger,
    PopoverContent
} from "@/components/ui/popover"
import {
    Command,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem
} from "@/components/ui/command"

import { getOrganizations } from "@/app/server"
import { OrganizationData } from "@/lib/api/models/response/get-organizations-response"
import { FetchError } from "@/lib/api/fetchData"

export default function OrganizationsCombobox() {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const [organizations, setOrganizations] = useState<OrganizationData[]>([])
    const router = useRouter()

    const fetchOrganizations = async () => {
        try {
            const response = await getOrganizations()

            if (response.data.length === 0) {
                toast.warning("No organizations found.")
                setOrganizations([])
            } else {
                setOrganizations(response.data)
            }
        } catch (error) {
            if (error instanceof FetchError) {
                toast.error(error.message)
            } else {
                toast.error("Unexpected error occurred.")
            }
        }
    }

    useEffect(() => {
        fetchOrganizations()
    }, [])

    return (
        <div className="w-full min-w-[200px]">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                    >
                        {value
                            ? organizations.find((org) => org.organizationName === value)?.organizationName
                            : "Select organization..."}
                        <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                    <Command className="w-full">
                        <CommandInput placeholder="Search organization..." />
                        <CommandList className="w-full">
                            <CommandEmpty>No organization found.</CommandEmpty>
                            <CommandGroup>
                                {organizations.map((org) => (
                                    <CommandItem
                                        key={org.organizationId}
                                        value={org.organizationName}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue)
                                            setOpen(false)
                                            const selected = organizations.find(o => o.organizationName === currentValue)
                                            if (selected) router.push(`/cus/${selected.organizationId}`)
                                        }}
                                    >
                                        <CheckIcon
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === org.organizationName ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {org.organizationName}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}
