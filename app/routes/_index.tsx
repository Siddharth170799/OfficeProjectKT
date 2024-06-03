import type { MetaFunction } from "@remix-run/node";
import AutoComplete from '~/components/AutoComplete'




export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {

 


  const fetchSuggestions=async(query)=>{
  const response = await fetch(`https://dummyjson.com/recipes/search?q=${query}`);
  if(!response.ok){
    throw new Error("Network response was not ok");
  }
  const result= await response.json();
  return result.recipes;
  }
  return(
    <>
    <h1>Auto Complete / typehead</h1>
<AutoComplete placeholder={"Enter Recipe"}
fetchSuggestions={fetchSuggestions}
dataKey={"name"}
customLoading={<> Loading Recipes.....</>}
// onSelect={(res)=>{console.log(res)}}
// onchange={(input)=>{}}
// onBlur={(e)=> {}}
// onFocus={(e)=>{}}
// customStyles={{}}

/>

    </>

  )
}
