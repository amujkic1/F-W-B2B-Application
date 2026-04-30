import { useQuery } from '@tanstack/react-query'

import { fetchHelloMessage } from '@/api/hello.js'

export function useHelloQuery() {
  return useQuery({
    queryKey: ['hello-message'],
    queryFn: fetchHelloMessage,
  })
}
