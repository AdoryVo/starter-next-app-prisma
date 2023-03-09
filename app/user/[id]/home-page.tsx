'use client'

import type { User } from "@utils/getUser"

export default function HomePage({ user }: { user: User }) {
	return (
		<>{JSON.stringify(user)}</>
	)
}