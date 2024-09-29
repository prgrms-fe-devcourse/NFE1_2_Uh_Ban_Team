import LikeIcon from '@assets/icons/heart_before_select.svg?react'
import SelectedLikeIcon from '@assets/icons/heart_after_select.svg?react'
import './index.css'
import { Like } from '@/typings/types'
import { FC, useEffect, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getLikedData } from '@/utils/api'

interface LikeButtonProps {
  likes: Like[]
  postId: string
}

const userId = import.meta.env.VITE_USER_ID
const token = import.meta.env.VITE_TOKEN

/**
 *
 * 현재는 env에 있는 토큰 값을 사용하지만 추후 로그인시 설계된 id를 가져와 사용예정
 * 추후 옵티미스틱 UI 및 디바운싱 처리 예정
 */

const LikeButton: FC<LikeButtonProps> = ({ likes, postId }) => {
  const [isLiked, setIsLiked] = useState<boolean | null>(null)

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: () => getLikedData(isLiked, { userId, token, postId }),
    onSuccess: () => {
      setIsLiked((prevState) => !prevState)
      queryClient.invalidateQueries({ queryKey: ['post', postId] })
    },
  })

  useEffect(() => {
    // 최초 진입시 해당 게시물에 유저가 Like를 남겼는지 체크
    const checkUserLike = likes.some(({ user }) => user === userId)
    setIsLiked(checkUserLike)
  }, [likes])

  const handleSubmitLiked = () => {
    mutate()
  }

  return (
    <div className='like-btn-container'>
      <button
        className='like-btn'
        onClick={handleSubmitLiked}
      >
        {isLiked ? (
          <SelectedLikeIcon
            width={35}
            height={35}
          />
        ) : (
          <LikeIcon
            width={40}
            height={40}
            fill='#eee'
          />
        )}
      </button>
      <p>{likes.length}</p>
    </div>
  )
}

export default LikeButton
