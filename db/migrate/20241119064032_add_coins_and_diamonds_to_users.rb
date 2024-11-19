class AddCoinsAndDiamondsToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :coins, :integer, default: 0, null: false
    add_column :users, :diamonds, :integer, default: 0, null: false
  end
end
