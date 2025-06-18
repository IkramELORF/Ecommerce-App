import { DEFAULT_LIMIT } from "@/constants";
import { loadProductFilters } from "@/modules/products/search-params";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SearchParams } from "nuqs/server";
export const dynamic = "force-dynamic";

interface Props {
    params: Promise<{
        subcategory: string;
    }>,
    searchParams: Promise<SearchParams>;
}
const Page = async ({ params, searchParams }: Props) => {
    const { subcategory } = await params;

    const filters = await loadProductFilters(searchParams);
    const minPrice = filters.minPrice ? Number(filters.minPrice) : null;
    const maxPrice = filters.maxPrice ? Number(filters.maxPrice) : null;
    const tags = filters.tags;

    const queryClient = getQueryClient();

    void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions(
        {
            category: subcategory,
            minPrice,
            maxPrice,
            tags,
            limit: DEFAULT_LIMIT,
        }
    ));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductListView category={subcategory} />
        </HydrationBoundary>
    );
};


export default Page;