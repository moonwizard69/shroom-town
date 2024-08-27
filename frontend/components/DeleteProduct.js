import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

// evict item from apollo cache when we delete an item so it updates page
function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteProduct));
}
export default function DeleteProduct({ id, children }) {
  const [deleteProduct, { loading, error }] = useMutation(
    DELETE_PRODUCT_MUTATION,
    {
      variables: {
        id,
      },
      update,
    }
  );
  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => {
        if (confirm('Are you sure you want to delete this item?')) {
          if (
            confirm('FINAL WARNING: Do you really want to delete this item?')
          ) {
            deleteProduct().catch((err) => alert(err.message));
          }
        }
      }}
    >
      {children}
    </button>
  );
}
