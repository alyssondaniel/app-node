import ProductsController from '../../../src/controllers/products';
import sinon from 'sinon';
import Product from '../../../src/models/product';

describe('Controllers: Products', () => {
  const defaultProduct = [{
    name: 'Default product',
    description: 'product description',
    price: 100
  }];
  const defaultRequest = {
    params: {}
  }

  describe('get() products', () => {
    it('should call send with a list of products', () => {
      const response = {
        send: sinon.spy()
      };
      
      Product.find = sinon.stub();
      Product.find.withArgs({}).resolves(defaultProduct);
      
      const productsController = new ProductsController(Product);
      productsController.get(defaultRequest, response)
        .then(() => {
          sinon.assert.calledWith(response.send, defaultProduct);
        });
    });

    it('should return 400 when an error occurs', () => {
      const request = {};
      const response = {
        send: sinon.spy(),
        status: sinon.stub()
      };

      response.status.withArgs(400).returns(response);
      
      Product.find = sinon.stub();
      Product.find.withArgs({}).rejects({ message: 'Error' });

      const productsController = new ProductsController(Product);

      return productsController.get(request, response) .then(() => {
        sinon.assert.calledWith(response.send, 'Error');
      });
    });
  });

  describe('getById()', () => {
    it('should call send with one product', () => {
      const fakeId = 'a-fake-id';
      const request = {
        params: {
          id: fakeId
        }
      };
      const response = {
        send: sinon.spy()
      };

      Product.find = sinon.stub();
      Product.find.withArgs({ _id: fakeId }).resolves(defaultProduct);

      const productsController = new ProductsController(Product);

      return productsController.getById(request, response)
        .then(() => {
          sinon.assert.calledWith(response.send, defaultProduct);
        });
    })
  });
});