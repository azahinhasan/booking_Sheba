import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();
async function main() {
  const superAdminRole = await prisma.roles.createMany({
    data: [
      { id: 1, role: 'SUPER_ADMIN', context: 'MT' },
      { id: 2, role: 'ADMIN', context: 'MT' },
      { id: 3, role: 'MANAGER', context: 'MT' },
      { id: 4, role: 'DEVELOPER', context: 'MT' },
      { id: 5, role: 'ADMIN', context: 'CLIENT' },
      { id: 6, role: 'CUSTOMER', context: 'CLIENT' },
    ],
  });

  const passwordHashed = await argon2.hash('123456');

  const addUsers = await prisma.users.createMany({
    data: [
      {
        uid: 'AUTH-123987',
        email: 'admin@test.test',
        phone: '01711355057',
        name: 'Abir Rahman',
        password: passwordHashed,
        userWeight: 10,
        roleId: 1,
        isMfaEnabled: false,
        isPasswordValid: true,
        isPasswordResetRequired: false,
        lastPasswordResetDate: new Date(),
      },
      {
        uid: 'AUTH-123988',
        email: 'admin2@test.test',
        phone: '01711355058',
        name: 'John Doe',
        password: passwordHashed,
        userWeight: 8,
        roleId: 2,
        isMfaEnabled: false,
        isPasswordValid: true,
        isPasswordResetRequired: false,
        lastPasswordResetDate: new Date(),
      },
      {
        uid: 'AUTH-123989',
        email: 'manager@test.test',
        phone: '01711355059',
        name: 'Jane Smith',
        password: passwordHashed,
        userWeight: 7,
        roleId: 3,
        isMfaEnabled: true,
        isPasswordValid: true,
        isPasswordResetRequired: false,
        lastPasswordResetDate: new Date(),
      },
      {
        uid: 'AUTH-123990',
        email: 'user@test.test',
        phone: '01711355060',
        name: 'Alice Johnson',
        password: passwordHashed,
        userWeight: 6,
        roleId: 6,
        isMfaEnabled: false,
        isPasswordValid: true,
        isPasswordResetRequired: false,
        lastPasswordResetDate: new Date(),
      },
      {
        uid: 'AUTH-123991',
        email: 'user2@test.test',
        phone: '01711355061',
        name: 'Bob Williams',
        password: passwordHashed,
        userWeight: 5,
        roleId: 6,
        isMfaEnabled: false,
        isPasswordValid: true,
        isPasswordResetRequired: false,
        lastPasswordResetDate: new Date(),
      },
      {
        uid: 'AUTH-123992',
        email: 'user3@test.test',
        phone: '01711355062',
        name: 'Charlie Brown',
        password: passwordHashed,
        userWeight: 4,
        roleId: 6,
        isMfaEnabled: false,
        isPasswordValid: true,
        isPasswordResetRequired: false,
        lastPasswordResetDate: new Date(),
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
