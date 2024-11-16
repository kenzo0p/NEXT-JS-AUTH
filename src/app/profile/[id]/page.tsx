export default function page({params}:any) {
  return (
    <div>
        <h1>profile page</h1>
        {params.id}
    </div>
  )
}
