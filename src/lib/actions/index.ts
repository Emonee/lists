'use server'

import { z } from 'zod'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

const userSchema = z.object({
  id: z.coerce.number(),
  email: z.string(),
  name: z.optional(z.string())
})

const newUser = userSchema.omit({ id: true })
const deleteUser = userSchema.omit({ email: true, name: true })

export const registerAction = async (formData: FormData) => {
  const rawFormData = Object.fromEntries(formData.entries())
  const validatedFields = newUser.safeParse(rawFormData)
  if (!validatedFields.success) throw new Error('Email is required')
  const { data: { email, name } } = validatedFields
  await prisma.user.create({
    data: {
      email,
      name
    }
  })
  revalidatePath('/')
}

export const removeUserAction = async (formData: FormData) => {
  const rawFormData = Object.fromEntries(formData.entries())
  const validatedFields = deleteUser.safeParse(rawFormData)
  if (!validatedFields.success) throw new Error('Email is required')
  const { data: { id } } = validatedFields
  await prisma.user.delete({
    where: { id }
  })
  revalidatePath('/')
}
