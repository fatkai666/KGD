import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Alert from './'

describe('test Alert component', () => {
  it('should render the correct default Alert', () => {
    const wrapper = render(<Alert title = 'Alert-test'/>)
    const element = wrapper.getByText('Alert-test').parentNode as HTMLElement
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('DIV')
    expect(element).toHaveClass('kgd-alert kgd-alert-default')
  })
  it('should render the correct component based on different closeFunction', () => {
    const wrapper = render(<Alert title = 'Alert-onClose-test' onClose = {() => {console.log('aaa')}}/>)
    const element = wrapper.getByText('Alert-onClose-test').nextElementSibling as HTMLElement
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('kgd-alert-close')
    fireEvent.click(element)
  })
})