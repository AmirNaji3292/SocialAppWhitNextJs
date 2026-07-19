'use server'

import z, { success } from "zod";
import { prisma } from "./client";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";



export const switchFollow=async(userId:string)=>{
    
      const {userId:currentUserId}=await auth();

        if(!currentUserId){
        throw new Error('Authenticate went wrong.')
            
        }

    try {
        const existingFollow=await prisma.follower.findFirst({
            where:{
                followerId:currentUserId,
                followingId:userId,
            }
        })
         if(existingFollow){
            await prisma.follower.delete({
                where:{
                    id:existingFollow.id,
                }
            })
         }

         const existingFollowReq=await prisma.followRequest.findFirst({
            where:{
                senderId:currentUserId,
                receiverId:userId,
            }
         })
      
         if(existingFollowReq){
            await prisma.followRequest.delete({
                where:{
                    id:existingFollowReq.id
                }
            })
         }else{
            await prisma.followRequest.create({
                data:{
                    senderId:currentUserId,
                    receiverId:userId,
                }
            })
         }
    } catch (error) {
        console.log(error)
        throw new Error('somthing went wrong.')
    }
}





export const switchBlock=async(userId:string)=>{
    const {userId:currentUserId}=await auth();
    if(!currentUserId){
        throw new Error('something went wrong!!')
    }

    try {
        const existingBlock=await prisma.block.findFirst({
            where:{
                blockerId:currentUserId,
                blockedId:userId,
            }
        })
        if(existingBlock){
            await prisma.block.delete({
                where:{
                    id:existingBlock.id
                }
            })
        }else{
            await prisma.block.create({
                data:{
                    blockerId:currentUserId,
                    blockedId:userId,
                }
            })
        }
    } catch (error) {
        console.log(error)
        throw new Error('something went wrong!!')
    }
}







export const acceptFollowRequest=async(userId:string)=>{
    const{userId:currentUserId}=await auth();
    if(!currentUserId){
        throw new Error('not Authenticated!!')
    }


    try {
        const existingFollowRequest=await prisma.followRequest.findFirst({
            where:{
                senderId:userId,
                receiverId:currentUserId,
            }
        })
        if(existingFollowRequest){
        await prisma.followRequest.delete({
            where:{
                id:existingFollowRequest.id
            }
        })
        }
        await prisma.follower.create({
            data:{
                followerId:userId,
                followingId:currentUserId,
            }
        })
    } catch (error) {
        console.log(error)
    }
}







export const declineFollowRequest=async(userId:string)=>{
    const{userId:currentUserId}=await auth();
    if(!currentUserId){
        throw new Error('not Authenticated!!')
    }


    try {
        const existingFollowRequest=await prisma.followRequest.findFirst({
            where:{
                senderId:userId,
                receiverId:currentUserId,
            }
        })
        if(existingFollowRequest){
        await prisma.followRequest.delete({
            where:{
                id:existingFollowRequest.id
            }
        })
        }
      
    } catch (error) {
        console.log(error)
    }
}






export const updateProfile=async(prevState:{success:boolean,error:boolean},
    payload:{formData:FormData,cover:string})=>{
        
    const {formData,cover}=payload;
 
   const fields = Object.fromEntries(formData.entries())

   const filterFields=Object.fromEntries(Object.entries(fields).filter(([_,value])=>value!== ""))

     
 
 const Profile=z.object({
    cover:z.string().optional(),
    name:z.string().max(60).optional(),
    surname:z.string().max(60).optional(),
    description:z.string().max(255).optional(),
    city:z.string().max(60).optional(),
    school:z.string().max(60).optional(),
    work:z.string().max(60).optional(),
    webkitURL:z.string().max(80).optional(),
 })
 
 const validateFields=Profile.safeParse({cover,...filterFields})

 if(!validateFields.success){
     console.log(validateFields.error.flatten().fieldErrors)
     return {success:false,error:true}
 }

 const {userId}=await auth()

   if(!userId)return {success:false,error:true}

   try {
      await prisma.user.update({
        where:{
            id:userId,
        },
        data:validateFields.data,
      }) 

       return{success:true,error:false}
   } catch (error) {
     console.log(error)
      return {success:false,error:true}
   } 


}






export const switchLike=async(postId:number)=>{
    const {userId}=await auth()
    if(!userId)throw Error('something went wrong in authentication')

        try {
            const existingLike=await prisma.like.findFirst({
                where:{
                    postId,
                    userId,
                }
            })

            if(existingLike){
                await prisma.like.delete({
                    where:{id:existingLike.id},
                })
            }else{
                await prisma.like.create({
                    data:{
                        postId,
                        userId,
                    }
                })
            }
        } catch (error) {
            console.log(error)
        }
}








export const addComment = async (postId: number, desc: string) => {
  const { userId } =await auth();

  if (!userId) throw new Error("User is not authenticated!");

  try {
    const createdComment = await prisma.comment.create({
      data: {
        desc,
        userId,
        postId,
      },
      include: {
        user: true,
      },
    });

    return createdComment;
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong!");
  }
};








export const addPost = async (formData: FormData, img: string) => {
  const desc = formData.get("desc") as string;

  const Desc = z.string().min(1).max(255);

  const validatedDesc = Desc.safeParse(desc);

  if (!validatedDesc.success) {
    //TODO
    console.log("description is not valid");
    return;
  }
  const { userId } =await auth();

  if (!userId) throw new Error("User is not authenticated!");

  try {
    await prisma.post.create({
      data: {
        desc: validatedDesc.data,
        userId,
        img,
      },
    });

    revalidatePath("/");
  } catch (err) {
    console.log(err);
  }
};








export const addStory = async (img: string) => {
  const { userId } = await auth();

  if (!userId) throw new Error("User is not authenticated!");

  try {
    const existingStory = await prisma.story.findFirst({
      where: {
        userId,
      },
    });

    if (existingStory) {
      await prisma.story.delete({
        where: {
          id: existingStory.id,
        },
      });
    }
    const createdStory = await prisma.story.create({
      data: {
        userId,
        img,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      include: {
        user: true,
      },
    });

    return createdStory;
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = async (postId: number) => {
  const { userId } =await auth();

  if (!userId) throw new Error("User is not authenticated!");

  try {
    await prisma.post.delete({
      where: {
        id: postId,
        userId,
      },
    });
    revalidatePath("/")
  } catch (err) {
    console.log(err);
  }
};








export async function deleteComment(commentId: number) {

  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const comment = await prisma.comment.findUnique({

    where: {

      id: commentId,

    },

  });

  if (!comment) throw new Error("Comment not found");

  // فقط صاحب کامنت بتواند حذف کند

  if (comment.userId !== userId) {

    throw new Error("Forbidden");

  }

  await prisma.comment.delete({

    where: {

      id: commentId,

    },

  });

  return commentId;

}