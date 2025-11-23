import React, { useRef, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const AddPost = () => {

  const queryClient = useQueryClient()

  const [isOpen, setIsOpen] = useState(false)

  const [viewImg, setViewImg] = useState(null)

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  //   const handleForm = e => {
  //     e.preventDefault()
  //   }

  //  form => useForm

  // select input textarea with using react but control with real DOM => useRef
  const postBody = useRef('')
  const postImg = useRef('')

  const [img, setImg] = useState('')

  function addPost () {
    // console.log(postBody.current.value)
    // file => .value => give me the fake path
    // console.log(img)
    const formData = new FormData()
    if (postBody.current.value != '') {
      formData.append('body', postBody.current.value)
      console.log(formData, 'if')
    }
    // console.log(formData);

    if (img != '') {
      formData.append('image', img)
      console.log(formData, 'if2')
    }

    return axios.post('https://linked-posts.routemisr.com/posts', formData, {
      headers: {
        token: localStorage.getItem('token'),
      },
    })
  }

  // console.log(postImg);

  function handleImg () {
    const src = URL.createObjectURL(postImg.current?.files[0])
    setImg(postImg.current?.files[0])
    setViewImg(src)
  }

  function handleCloseImg () {
    setViewImg(null)
    postImg.current = ''
    setImg('')
  }

  const { isPending, mutate } = useMutation({
    mutationFn: addPost,
    onSuccess: (data) => {
      postBody.current.value =""
      console.log(data);
      handleCloseImg()
      // close modal
      handleClose()
      queryClient.invalidateQueries({
        queryKey: ['userPosts'],
      })

      // re user Posts
    },
    onError: (error) => {
      console.log(error)
    }
  })

  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button className='btn btn-primary' onClick={handleOpen}>
        Add Post
      </button>
      {isOpen && (
        <dialog open id='my_modal_1' className='modal'>
          <div className='modal-box'>
            <h3 className='font-bold text-lg'>Add New Post</h3>

            {/* body post */}
            <textarea
              ref={postBody}
              placeholder='body post'
              className='textarea textarea-primary w-full mt-10 mb-4'
            ></textarea>

            {/* img post */}
            {viewImg ? (
              <div className='mt-5'>
                <i
                  onClick={handleCloseImg}
                  className='fa-solid fa-xmark !block ms-auto cursor-pointer mb-2'
                ></i>
                <img src={viewImg} className='w-full' alt='' />
              </div>
            ) : (
              <div className='flex items-center justify-center w-full'>
                <label
                  htmlFor='dropzone-file'
                  className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
                >
                  <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                    <svg
                      className='w-8 h-8 mb-4 text-gray-500 dark:text-gray-400'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 20 16'
                    >
                      <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
                      />
                    </svg>
                    <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                      <span className='font-semibold'>Click to upload</span> or
                      drag and drop
                    </p>
                    <p className='text-xs text-gray-500 dark:text-gray-400'>
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    ref={postImg}
                    onChange={handleImg}
                    id='dropzone-file'
                    type='file'
                    className='hidden'
                  />
                </label>
              </div>
            )}

            <button onClick={mutate} className='btn btn-primary mt-5'>
              {isPending ? <i className='fa-solid fa-spinner fa-spin'></i> : 'Add Post'}
            </button>
            <div className='modal-action'>
              {/* <form onSubmit={handleForm} method='dialog'> */}
              {/* if there is a button in form, it will close the modal */}
              <button onClick={handleClose} className='btn btn-primary'>
                Close
              </button>
              {/* </form> */}
            </div>
          </div>
        </dialog>
      )}
    </>
  )
}

export default AddPost
