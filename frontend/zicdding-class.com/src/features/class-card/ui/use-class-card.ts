import { useCallback } from 'react';

export function useClassCard() {
  const onCreateClassLike = useCallback(() => {
    alert('좋아요 등록');
  }, []);
  const onDeleteClassLike = useCallback(() => {
    alert('좋아요 삭제');
  }, []);

  const onClickLike = useCallback(
    (like: boolean) => {
      if (like) {
        onDeleteClassLike();
      } else {
        onCreateClassLike();
      }
    },
    [onCreateClassLike, onDeleteClassLike],
  );

  return { onClickLike };
}
