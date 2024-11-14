export interface Class {
  classId: number; // 클래스 아이디
  classTitle: string; // 클래스 제목
  recruitmentYn: 'Y' | 'N'; // 모집 기간 여부
  startDate: string; // 모집 시작일 (yyyy-mm-dd)
  endDate: string; // 모집 종료일 (yyyy-mm-dd)
  classHow: '온라인' | '오프라인'; // 진행 방식
  classType: '프로젝트' | '스터디' | '모임'; // 클래스 구분
  estConfirmYn: 'Y' | 'N'; // 예상 기간 확정 여부
  estMonth: number; // 예상 기간 (개월수)
  headcount: number; // 모집 인원
  contectType: '오픈톡' | '이메일' | '구글폼' | '디스코드'; // 연락 방법
  contectUrl: string; // 연락 주소
  content: string; // 내용
  nickname: string; // 작성자 닉네임
  userId: number; // 작성자 아이디
  position: string[]; // 포지션
  technology: Technology[]; // 기술 스택 배열
  likeCnt: number; // 좋아요 개수
  myLike: number; // 로그인 사용자 좋아요 여부 (0 또는 1)
  viewCnt: number; // 조회수
  commentCnt: number; // 댓글 수
}

interface Technology {
  name: string; // 기술 스택 이름
  imgUrl: string; // 기술 스택 이미지 주소
}
