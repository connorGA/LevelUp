class CreatePlots < ActiveRecord::Migration[7.1]
  def change
    create_table :plots do |t|
      t.references :user, null: false, foreign_key: true
      t.string :floor_texture
      t.string :wall_texture

      t.timestamps
    end
  end
end
