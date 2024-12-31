import { Transport } from '@nestjs/microservices'

const getTransport = (transport: string) => {
    switch (transport) {
        case 'TCP':
            return Transport.TCP
        case 'REDIS':
            return Transport.REDIS
        case 'NATS':
            return Transport.NATS
        case 'RMQ':
            return Transport.RMQ
        case 'GRPC':
            return Transport.GRPC
        case 'KAFKA':
            return Transport.KAFKA
        default:
            return Transport.TCP
    }
}

export default getTransport
