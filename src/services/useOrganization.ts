import {useQuery} from "@tanstack/react-query";
import {fetchData} from "@/lib/api/fetchData";
import {Organization} from "@/lib/api/models/entity/organization";
import {ApiEndpoints} from "@/lib/api/endpoints";
import {setOrganization} from "@/stores/oraganizationStore";

export const useFetchOrganization = (name: string) =>
    useQuery({
        queryKey: ['organization', name],
        queryFn: () => {
            console.log('fetching organization', name)
            console.log('fetching organization', `${ApiEndpoints.organization.fetch}?name=${encodeURIComponent(name)}`)
            fetchData<Organization>(`${ApiEndpoints.organization.fetch}?name=${encodeURIComponent(name)}` ).then(r => {
                setOrganization(r)
            })
        },
        enabled: !!name
    })