import { pgTable, serial, integer, text, timestamp } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	uid: text('id').primaryKey(),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow()
});

export const session = pgTable('session', {
	sid: text('sid').primaryKey(),
	userId: text('user_id').notNull().references(() => user.uid),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});


export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;
