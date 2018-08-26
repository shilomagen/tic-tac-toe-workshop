const uniqueNamesGenerator = jest.genMockFromModule('unique-names-generator');
(uniqueNamesGenerator as any).generate = () => 'big_yemen_boy';
export default uniqueNamesGenerator;

