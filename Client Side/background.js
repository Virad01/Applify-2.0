// chrome.action.onClicked.addListener(async (tab) => {
//     const tabUrl = tab.url;
//     const data = await fetchData(tabUrl);
//     console.log(data);
//   });
  
//   async function fetchData(url) {
//     try {
//       const response = await fetch("https://xf3mnw4d-2000.inc1.devtunnels.ms/scrape", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ url })
//       });
  
//       if (!response.ok) {
//         throw new Error("Failed to fetch data");
//       }
  
//       const result = await response.json();
//       return result;
//     } catch (error) {
//       console.error("Error fetching dta:", error);
//       return null;
//     }
//   }
  