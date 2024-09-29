import PostPoll from '@pages/PostDetail/PollSection'
import CommentSection from '@pages/PostDetail/CommentSection'
import DetailPageLayout from '@layouts/DetailPageLayout/DetailPageLayout'
import MessageBtn from '../MessageBtn'
import PostSection from '../PostSection'
import './index.css'
import { useQuery } from '@tanstack/react-query'
import formatPostData from '@/utils/formatPostData'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getPostData } from '@/utils/api'

const PostDetailPage = ({
  postId = '66f6d523e5593e2a995daf58', //추후 프롭으로 받아와서 처리 예정,
}: {
  postId: string
}) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPostData(postId),
  })

  if (isLoading) {
    return <div>Loading</div>
  }

  if (isError) {
    return <div>{error.message}</div>
  }

  if (data) {
    const post = formatPostData(data)
    const { comments } = post
    return (
      <>
        <ToastContainer
          position='top-right'
          autoClose={3000}
          limit={1}
        />
        <DetailPageLayout pageName='post-detail'>
          <PostSection post={post} />
          <PostPoll />
          <CommentSection comments={comments} />
          <MessageBtn />
        </DetailPageLayout>
      </>
    )
  }
}

export default PostDetailPage
