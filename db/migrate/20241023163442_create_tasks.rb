class CreateTasks < ActiveRecord::Migration[7.1]
  def change
    create_table :tasks do |t|
      t.references :user, null: false, foreign_key: true
      t.string :title
      t.text :description
      t.boolean :completed

      t.timestamps
    end
  end
end
