import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { SearchParams } from "nuqs";
import { loadProductFilters } from "@/modules/products/search-params";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";

interface Props {
    params: Promise<{
        category: string;
    }>,
    searchParams: Promise<SearchParams>;
}

const Page = async ({ params, searchParams }: Props) => {
    const { category } = await params;

    const filters = await loadProductFilters(searchParams);
    const minPrice = filters.minPrice ? Number(filters.minPrice) : null;
    const maxPrice = filters.maxPrice ? Number(filters.maxPrice) : null;
    const tags = filters.tags;

    const queryClient = getQueryClient();

    void queryClient.prefetchQuery(trpc.products.getMany.queryOptions(
        {
            category,
            minPrice,
            maxPrice,
            tags,
        }
    ));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductListView category={category} />
        </HydrationBoundary>
    );
};

export default Page;