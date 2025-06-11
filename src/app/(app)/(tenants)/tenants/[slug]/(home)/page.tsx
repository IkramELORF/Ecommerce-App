import { DEFAULT_LIMIT } from "@/constants";
import { loadProductFilters } from "@/modules/products/search-params";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { SearchParams } from "nuqs";



interface Props {
    searchParams: Promise<SearchParams>;
    params: Promise<{slug: string}>;
}
const Page = async ({ params, searchParams}:Props)=>{
    const { slug } = await params;
    const filters = await loadProductFilters(searchParams); 
    const minPrice = filters.minPrice ? Number(filters.minPrice) : null;
    const maxPrice = filters.maxPrice ? Number(filters.maxPrice) : null;
    const tags = filters.tags;
    
    const queryClient = getQueryClient();
    
        void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions(
            {
                tenantSlug: slug,
                minPrice,
                maxPrice,
                tags,
                limit: DEFAULT_LIMIT,    
            }
        ));
 return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductListView tenantSlug={slug} narrowView/>
        </HydrationBoundary>
    );
};
export default Page;