import React from 'react'
import UserInfo from './../UserInfo/UserInfo'
import { Link } from 'react-router-dom'
import CommentForm from '../CommentForm/CommentForm'
import HeaderPost from '../HeaderPost/HeaderPost'

const Post = ({ post, isPostDetails }) => {

  console.log(post);
  
  return (
    <>
      <div className='p-5 bg-slate-700 mb-3 rounded-xl'>
        {/* Header */}
        <div className='header'>
          <HeaderPost
            userName={post?.user?.name}
            UserImg={post?.user?.photo}
            createAt={post?.createdAt}
            userPostId={post?.user?._id}
            postId={post?.id}
          />
        </div>

        {/* body */}
        <div className='body my-4'>
          <p className='text-center'>{post?.body}</p>
          <p className='text-center'>{post?.id}</p>
          <img className='w-full mt-4' src={post?.image} />
        </div>

        {/* comments */}
        {/* "" 0 null undefined false */}

        {post?.comments.length == 0 ? <h1>No comments</h1> : ""}

        {post?.comments.length > 0 && !isPostDetails ? (
          <div className='comments p-5 rounded-sm bg-slate-600 border-2 border-slate-200/20'>
            <Link
              to={`/postDetails/${post.id}`}
              className='mb-2 text-blue-500 block text-center'
            >
              View All Comments
            </Link>
            <UserInfo
              userName={post?.comments[0]?.commentCreator?.name}
              UserImg={
                post?.comments[0]?.commentCreator?.photo.includes('undefined')
                  ? 'https://png.pngtree.com/png-clipart/20200224/original/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_5247852.jpg'
                  : post?.comments[0]?.commentCreator?.photo
              }
              createAt={post?.comments[0]?.createdAt}
            />

            <p className='mt-4'>{post?.comments[0]?.content}</p>
          </div>
        ) : (
          <>
            {post?.comments && (
              <>
                {post?.comments.map(function (post , idx) {
                  return (
                    <div key={idx} className='comments p-5 mb-3 rounded-sm bg-slate-600 border-2 border-slate-200/20'>
                      <UserInfo
                        userName={post.commentCreator?.name}
                        UserImg={
                          post.commentCreator?.photo.includes(
                            'undefined'
                          )
                            ? 'https://png.pngtree.com/png-clipart/20200224/original/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_5247852.jpg'
                            : post.commentCreator?.photo
                        }
                        createAt={post.createdAt}
                      />

                      <p className='mt-4'>{post.content}</p>
                    </div>
                  )
                })}
              </>
            )}
          </>
        )}

        <CommentForm id={post.id}/>
      </div>
    </>
  )
}

export default Post
