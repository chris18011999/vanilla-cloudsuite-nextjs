export const HOST = "https://test-vanilla.cloudsuite.com";
export const LANGUAGE_CODE = "/nl-nl";

async function doFetch<T>(url: string): Promise<T> {
  return await fetch(`${HOST}${url}`).then((data) => data.json());
}

async function getTrees(): Promise<T_TreeResult> {
  return await doFetch<T_TreeResult>(
    `${LANGUAGE_CODE}/api/v1/tree/?tree_id=1&depth=3`
  );
}

async function getProductsByTree(tree_id: number): Promise<T_TreeSearchResultProducts> {
  return await doFetch<T_TreeSearchResultProducts>(
    `${LANGUAGE_CODE}/api/v1/search/products/?tree_id=${tree_id}`
  );
}

async function getFiltersByTree(tree_id: number): Promise<T_TreeSearchResultFilters> {
  return await doFetch<T_TreeSearchResultFilters>(
    `${LANGUAGE_CODE}/api/v1/search/filters/?tree_id=${tree_id}`
  );
}

async function getProductById(product_id: number): Promise<T_Product> {
  const features = [
    ["features", "prices"],
    ["features", "variant"],
    ["features", "attributes"],
    ["features", "stock"],
    ["features", "featured_attributes"],
  ];

  const featureList = new URLSearchParams(features);
  return await doFetch<T_Product>(
    `${LANGUAGE_CODE}/api/v1/product/v2/${product_id}/?${featureList}`
  );
}

const dataFetcher = { getTrees, getProductsByTree, getProductById, getFiltersByTree };

export default dataFetcher;
