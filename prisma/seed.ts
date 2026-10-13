generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

enum UserRole {
  CUSTOMER
  VENDOR
  ADMIN
}

enum ShopStatus {
  PENDING
  ACTIVE
  SUSPENDED
}

enum OrderStatus {
  PENDING
  PAID
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
}

model User {
  id           String   @id @default(cuid())
  name         String
  email        String   @unique
  passwordHash String
  role         UserRole @default(CUSTOMER)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  shop        Shop?
  orders      Order[]
  favorites   Favorite[]
  reviews     Review[]
}

model Shop {
  id          String     @id @default(cuid())
  name        String
  handle      String     @unique
  description String?
  phone       String?
  logoUrl     String?
  status      ShopStatus @default(PENDING)
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  ownerId     String @unique
  owner       User   @relation(fields: [ownerId], references: [id])
  products    Product[]
}

model Category {
  id        String    @id @default(cuid())
  name      String
  slug      String    @unique
  icon      String?
  createdAt DateTime  @default(now())
  products  Product[]
}

model Product {
  id               String   @id @default(cuid())
  name             String
  slug             String   @unique
  price            Float
  compareAtPrice   Float?
  stock            Int      @default(0)
  shortDescription String
  description      String
  images           String
  categoryId       String?
  category         Category? @relation(fields: [categoryId], references: [id])
  shopId           String
  shop             Shop     @relation(fields: [shopId], references: [id])
  featured         Boolean  @default(false)
  trending         Boolean  @default(false)
  flashDeal        Boolean  @default(false)
  discountPercent  Int      @default(0)
  avgRating        Float    @default(0)
  colors           String   @default("[]")
  sizes            String   @default("[]")
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt

  favorites Favorite[]
  reviews   Review[]
  orderItems OrderItem[]
}

model Favorite {
  id        String  @id @default(cuid())
  userId    String
  productId String

  user      User    @relation(fields: [userId], references: [id])
  product   Product @relation(fields: [productId], references: [id])

  @@unique([userId, productId])
}

model Review {
  id        String   @id @default(cuid())
  rating    Int
  comment   String?
  createdAt DateTime @default(now())
  userId    String
  productId String

  user      User    @relation(fields: [userId], references: [id])
  product   Product @relation(fields: [productId], references: [id])
}

model Order {
  id              String      @id @default(cuid())
  reference       String      @unique
  status          OrderStatus @default(PENDING)
  total           Float
  paymentStatus   String      @default("pending")
  shippingAddress String
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt

  userId          String
  user            User        @relation(fields: [userId], references: [id])
  items           OrderItem[]
}

model OrderItem {
  id          String  @id @default(cuid())
  productId   String
  quantity    Int
  unitPrice   Float
  productName String

  orderId     String
  order       Order   @relation(fields: [orderId], references: [id])
  product     Product @relation(fields: [productId], references: [id])
}

