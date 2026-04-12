// import { PrismaClient } from "@prisma/client";

import { prisma } from "../config/prismaClient.config";

// const prisma = new PrismaClient();

// // 1. TOGGLE WISHLIST (LIKE / UNLIKE)
// export const toggleWishlistService = async (userId: string, eventId: string) => {
//   const existing = await prisma.wishlist.findUnique({
//     where: {
//       userId_eventId: {
//         userId: userId,
//         eventId: eventId,
//       },
//     },
//   })
  

//   // UNLIKE
//   if (existing) {
//     await prisma.wishlist.delete({
//       where: { userId: existing.id },
//     });

//     return { liked: false, message: "Removed from wishlist" };
//   }

//   // LIKE
//   await prisma.wishlist.create({
//     data: {
//       userId: userId,
//       eventId: eventId,
//     },
//   });

//   return { liked: true, message: "Added to wishlist" };
// };

// // 1. TOGGLE WISHLIST (LIKE / UNLIKE)
// export const toggleWishlistService = async (userId: string, eventId: string) => {
//   const existing = await prisma.wishlist.findUnique({
//     where: {
//       userId_eventId: {
//         userId,
//         eventId,
//       },
      
//     },
//   });


//   //UNLIKE
//   if (existing) {
//     await prisma.wishlist.delete({
//       where: {
//         userId_eventId: {
//           userId,
//           eventId,
//         },
//       },
//     });

//     return { liked: false, message: "Removed from wishlist" };
//   }
//  //LIKE
//   await prisma.wishlist.create({
//     data: {
//       userId,
//       eventId,
//     },
//   });

//   return { liked: true, message: "Added to wishlist" };
  
// };

export const toggleWishlistService = async (userId: string, eventId: string) => {
  console.log("=== TOGGLE WISHLIST ===");
  console.log("User:", userId);
  console.log("Event:", eventId);

  const existing = await prisma.wishlist.findUnique({
    where: {
      userId_eventId: {
        userId,
        eventId,
      },
    },
  });



  // UNLIKE
  if (existing) {
    console.log("ACTION: UNLIKE");

    await prisma.wishlist.delete({
      where: {
        userId_eventId: {
          userId,
          eventId,
        },
      },
    });

    return { liked: false, message: "Removed from wishlist" };
  }

  // LIKE

  await prisma.wishlist.create({
    data: {
      userId,
      eventId,
    },
  });

  return { liked: true, message: "Added to wishlist" };
};


// 2. GET MY WISHLIST
export const getWishlistService = async (userId: string) => {
  return await prisma.wishlist.findMany({
    where: { userId },
    include: {
      event: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

// // 3. CHECK IS LIKED (OPTIONAL - buat frontend)
// export const checkWishlistService = async (userId: string, eventId: string) => {
//   const data = await prisma.wishlist.findUnique({
//     where: {
//       user_id_event_id: {
//         user_id: userId,
//         event_id: eventId,
//       },
//     },
//   });

//   return { liked: !!data };
