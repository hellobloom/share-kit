import {uniq} from 'lodash'

export type TUnvalidated<ValidatedSchema> = {readonly [Key in keyof ValidatedSchema]?: any}

export type TReject = (error: string) => void

export interface IInvalidParamError {
  kind: 'invalid_param'
  message: string
}

export const requiredField = <T>(data: T) => (field: keyof T) => {
  if (data[field] === undefined) {
    return false
  }
  return true
}

export const genParamsValidator = <ParamType>(
  validations: Array<[keyof TUnvalidated<ParamType>, (value: any, data?: any) => boolean, boolean]>
) => {
  return (data: TUnvalidated<ParamType>): data is ParamType => {
    const requiredFields = uniq(validations.map(([first]) => first))

    if (!requiredFields.every(requiredField(data))) return false

    const allValidationsPassed = validations.every(([fieldName, validation, useFullData]) => {
      let outcome = useFullData ? validation(data[fieldName], data) : validation(data[fieldName])
      if (outcome) {
        return true
      }
      throw new Error(`Invalid ${fieldName}: ${JSON.stringify(data[fieldName])}`)
    })

    return allValidationsPassed
  }
}

export const genParamsDataValidator = <ParamType>(
  validations: Array<[keyof TUnvalidated<ParamType>, (value: any, data?: any) => boolean, boolean]>
) => {
  return (data: TUnvalidated<ParamType>): ParamType => {
    const validateParamsType = genParamsValidator(validations)
    if (!validateParamsType(data)) {
      throw new Error(`Invalid`)
    }
    return data
  }
}

export const genValidateFn = <ParamType>(
  validations: Array<[keyof TUnvalidated<ParamType>, (value: any, data?: any) => boolean, boolean]>
) => {
  return (input: TUnvalidated<ParamType>): IInvalidParamError | {kind: 'validated'; data: ParamType} => {
    try {
      const paramDataValidator = genParamsDataValidator(validations)
      const validated = paramDataValidator(input)
      return {kind: 'validated', data: validated}
    } catch (error) {
      return {kind: 'invalid_param', message: error.message}
    }
  }
}
