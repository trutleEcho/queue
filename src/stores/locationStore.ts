import {Store} from "@tanstack/store";

export const locationStore = new Store<{ location: Location | null }>({
    location: null
})

export const setLocation = (location: Location) => locationStore.setState(() => ({location}))
export const resetLocation = () => locationStore.setState(() => ({location: null}))