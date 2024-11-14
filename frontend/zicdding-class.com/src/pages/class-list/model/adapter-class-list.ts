import type { ApiResponse } from '@/src/entities/class';

export function adapterClassList(response: ApiResponse) {
  const classes = response.data.classes;
  return classes.map((item) => ({
    classId: item.classId,
    classTitle: item.classTitle,
    myLike: Boolean(item.myLike), // GYU-TODO: 백엔드 논의 하기 | 1, 0 으로 되어 있음 ㅠㅠ
    startDate: item.startDate,
    endDate: item.endDate,
    positions: item.position,
    technology: item.technology,
    nickname: item.nickname,
    likeCnt: item.likeCnt,
    viewCnt: item.viewCnt,
    commentCnt: item.commentCnt,
  }));
}
