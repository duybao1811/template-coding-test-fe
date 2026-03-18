'use client';

import { RefObject, useEffect, useRef } from 'react';

type UseChatScrollPaginationParams = {
  containerRef: RefObject<HTMLDivElement | null>;
  onLoadMore: () => Promise<void>;
  enabled: boolean;
  threshold?: number;
};

export const useChatScrollPagination = ({
  containerRef,
  onLoadMore,
  enabled,
  threshold = 50,
}: UseChatScrollPaginationParams) => {
  const isFetchingRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = async () => {
      if (!enabled || isFetchingRef.current) return;

      if (container.scrollTop <= threshold) {
        isFetchingRef.current = true;

        const previousScrollHeight = container.scrollHeight;
        const previousScrollTop = container.scrollTop;

        await onLoadMore();

        requestAnimationFrame(() => {
          const nextScrollHeight = container.scrollHeight;
          container.scrollTop =
            nextScrollHeight - previousScrollHeight + previousScrollTop;
          isFetchingRef.current = false;
        });
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [containerRef, enabled, onLoadMore, threshold]);
};