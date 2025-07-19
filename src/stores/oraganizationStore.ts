import {Store} from "@tanstack/store";
import {Organization} from "@/lib/api/models/entity/organization";
import {useStore} from "@tanstack/react-store";

export const organizationStore = new Store<{ organization: Organization | null }>({
    organization: null
})

export const useGetOrganization = () => useStore(organizationStore).organization
export const setOrganization = (organization: Organization) => organizationStore.setState(() => ({organization}))
export const resetOrganization = () => organizationStore.setState(() => ({organization: null}))