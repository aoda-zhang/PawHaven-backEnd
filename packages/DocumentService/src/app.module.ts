import { Module } from '@nestjs/common'
import SharedModule from '@shared/shared.module'
import EmailModule from 'src/Email/email.module'
import PDFModule from 'src/PDF/PDF.module'
@Module({
    imports: [SharedModule, EmailModule, PDFModule],
    providers: []
})
export class AppModule {}
