export default function formDataToObjectHelper(formData: FormData): any {
  const data: any = {}
  formData.forEach((value, key) => {
    data[key] = value
  })
  return data
}