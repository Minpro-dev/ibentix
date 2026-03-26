-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('pending', 'paid', 'skipped');

-- CreateTable
CREATE TABLE "tickets" (
    "ticketId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "attendeeName" TEXT NOT NULL,
    "attendeeEmail" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("ticketId")
);

-- CreateTable
CREATE TABLE "orders" (
    "orderId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "orderNumber" VARCHAR(8) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DECIMAL(65,30) NOT NULL,
    "subtotal" DECIMAL(65,30) NOT NULL,
    "discountAmount" DECIMAL(65,30) NOT NULL,
    "totalAmount" DECIMAL(65,30) NOT NULL,
    "couponId" TEXT,
    "status" "OrderStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "orders_pkey" PRIMARY KEY ("orderId")
);

-- CreateTable
CREATE TABLE "events" (
    "eventId" TEXT NOT NULL,
    "organizerId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "thumbnailUrl" TEXT,
    "locationName" TEXT,
    "address" TEXT,
    "city" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "couponId" TEXT,
    "price" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "events_pkey" PRIMARY KEY ("eventId")
);

-- CreateTable
CREATE TABLE "eventCoupons" (
    "couponId" TEXT NOT NULL,
    "couponCode" VARCHAR(5) NOT NULL,
    "eventId" TEXT NOT NULL,
    "validFrom" TIMESTAMP(3) NOT NULL,
    "validUntil" TIMESTAMP(3) NOT NULL,
    "discountAmount" DECIMAL(65,30) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "eventCoupons_pkey" PRIMARY KEY ("couponId")
);

-- CreateTable
CREATE TABLE "eventCategories" (
    "categoryId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "categoryName" VARCHAR(30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "eventCategories_pkey" PRIMARY KEY ("categoryId")
);

-- CreateTable
CREATE TABLE "reviews" (
    "reviewId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "description" TEXT,
    "isAnonymous" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("reviewId")
);

-- CreateTable
CREATE TABLE "referralCoupons" (
    "referralId" TEXT NOT NULL,
    "couponCode" VARCHAR(5) NOT NULL,
    "userId" TEXT NOT NULL,
    "referralCodeBy" TEXT NOT NULL,
    "discountAmount" DECIMAL(65,30) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "referralCoupons_pkey" PRIMARY KEY ("referralId")
);

-- CreateTable
CREATE TABLE "organizerProfile" (
    "organizerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "organizerProfile_pkey" PRIMARY KEY ("organizerId")
);

-- CreateTable
CREATE TABLE "wishlist" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "wishlist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "reviews_orderId_key" ON "reviews"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "referralCoupons_couponCode_key" ON "referralCoupons"("couponCode");

-- CreateIndex
CREATE UNIQUE INDEX "organizerProfile_userId_key" ON "organizerProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "wishlist_userId_eventId_key" ON "wishlist"("userId", "eventId");

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("orderId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("eventId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "eventCategories"("categoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventCoupons" ADD CONSTRAINT "eventCoupons_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("eventId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("eventId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("orderId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referralCoupons" ADD CONSTRAINT "referralCoupons_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referralCoupons" ADD CONSTRAINT "referralCoupons_referralCodeBy_fkey" FOREIGN KEY ("referralCodeBy") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizerProfile" ADD CONSTRAINT "organizerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("eventId") ON DELETE RESTRICT ON UPDATE CASCADE;
