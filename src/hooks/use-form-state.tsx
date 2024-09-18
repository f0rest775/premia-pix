import { useState, useTransition } from 'react'

interface FormState<T = null> {
  success: boolean
  message: string | null
  data?: T
  errors: Record<string, string[]> | null
}
export function useFormState<T>(
  action: (data: FormData) => Promise<FormState<T>>,
  onSuccess?: () => Promise<void> | void,
  initialState?: FormState<T>
) {
  const [isPending, startTransition] = useTransition()

  const [formState, setFormState] = useState(
    initialState ?? {
      success: false,
      message: null,
      errors: null,
    }
  )

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)

    startTransition(async () => {
      const state = await action(data)

      if (state.success === true && onSuccess) {
        await onSuccess()
      }

      setFormState(state)
    })
  }

  return [formState, handleSubmit, isPending] as const
}