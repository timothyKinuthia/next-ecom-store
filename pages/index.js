import { getDataApi } from "../utils/functions"

export default function Home() {
  return (
    <div className="bg-red-700">
      <h3 className="font-bold text-center">hi</h3>
    </div>
  )
}

export async function getServerSideProps(context) {
  //const res = await getDataApi("product");
  //console.log(res.data);
  return {
    props: {}
  }
}
