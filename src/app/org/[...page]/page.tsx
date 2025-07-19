export default async function PatientLocationScreen({params,}:{
    params: Promise<{
        page:string[]
    }>
}){
    const {page} = await params
    if (page == undefined){
        return(
            <div>
                <h1>Home</h1>
            </div>
        )
    }
    return(
        <div>
            <h1>Location: {page.map((it)=>it + "/")}</h1>
        </div>
    )
}