import React from 'react';
import useModalStore from 'stores/ModalStore'
import  * as S  from './ApiLimitModalStyles';
import { convertTime } from '@/utils/convertTime';

export default function ApiLimitModal() {
  const { isOpen, isApiLimitModal, resetTimeInSeconds, closeModal } = useModalStore();
  
  if (!isOpen || !isApiLimitModal || !resetTimeInSeconds) return null;

  const resetTime = convertTime(resetTimeInSeconds);

  
  return (
    <S.ModalOverlay onClick={closeModal}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.Title>GitHub API한도에 도달했어요 🥹</S.Title>
        <S.Message>{resetTime} 후에 다시 시도해주세요🙏</S.Message>
        <S.Button onClick={closeModal}>확인</S.Button>
      </S.ModalContent>
    </S.ModalOverlay>
  );
}