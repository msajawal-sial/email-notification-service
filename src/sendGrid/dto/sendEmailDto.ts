class SendEmailDto {
    recipient: string;
    templateId: string;
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    metadata: any;
}

export default SendEmailDto;